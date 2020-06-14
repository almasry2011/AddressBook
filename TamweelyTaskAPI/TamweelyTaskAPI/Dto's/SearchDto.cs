using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamweelyTaskAPI.Dto_s
{
    public class SearchDto
    {
        public string SearchValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
