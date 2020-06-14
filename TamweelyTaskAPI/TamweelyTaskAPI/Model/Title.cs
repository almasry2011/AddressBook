using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamweelyTaskAPI.Model
{
    public class Title
    {
        public int Id { get; set; }
        public string TitleName { get; set; }
        public virtual ICollection<AddressBook> AddressBooks { get; set; }
    }
}
