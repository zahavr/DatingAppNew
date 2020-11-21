using API.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using API.Interfaces;
using API.Entities;
using System;

namespace API.Helper
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ActionExecutedContext resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            string username = resultContext.HttpContext.User.GetUserName();
            IUserRepository repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            AppUser user = await repo.GetUserByUserNameAsync(username);

            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}
