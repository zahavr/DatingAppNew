using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DateTimeExtansions
    {
        public static int CalculateAge(this DateTime dateOfBirthday)
        {
            DateTime today = DateTime.Today;
            int age = today.Year - dateOfBirthday.Year;

            if(dateOfBirthday.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
