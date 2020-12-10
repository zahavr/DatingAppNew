using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helper
{
    public class LikesParams : PaginatedParams
    {
        public int UserId { get; set; }

        public string Predicate { get; set; }
    }
}
