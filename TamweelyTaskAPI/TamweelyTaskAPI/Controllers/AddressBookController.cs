using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TamweelyTaskAPI.Dto_s;
using TamweelyTaskAPI.Model;
using TamweelyTaskAPI.Repositories.UnitOfWork;

namespace TamweelyTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddressBookController : ControllerBase
    {
        private readonly IUnitOfWork _Uow;
        private readonly IMapper _Mapper;

        public AddressBookController(IUnitOfWork uow, IMapper mapper)
        {
            _Uow = uow;
            _Mapper = mapper;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _Uow.AddressBooks.GetAll();
            var AddressListForReturn = _Mapper.Map<List< AddressBookForReturnDto>>(res);
            if (res.Any())
            {
                return Ok(AddressListForReturn);
            }
            return BadRequest();
        }

        [HttpPost("Search")]
        public async Task<IActionResult> Search(SearchDto SearchModel)
        {

            if (SearchModel.StartDate != null && SearchModel.EndDate !=null)
            {
               var res = await _Uow.AddressBooks.GetWhere(s=>s.Dob>= SearchModel.StartDate&&s.Dob<= SearchModel.EndDate);
                var ResForReturn = _Mapper.Map<List<AddressBookForReturnDto>>(res);
                if (res.Any())
                {
                    return Ok(ResForReturn);
                }
            }
            return BadRequest();
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody]AddressBookDto model)
        {
          var modelForAdd =  _Mapper.Map<AddressBook>(model);
            _Uow.AddressBooks.Add(modelForAdd);
           
            if (await _Uow.Save())
            {
                return Ok(new { Status=true,Message="Successfully Added" });
            }
            return BadRequest();
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody]AddressBookDto model)
        {
            var AddressToUpdate = await _Uow.AddressBooks.FirstOrDefault(p => p.Id ==model.Id);
            if (AddressToUpdate == null)
                return NotFound("Could't Found This AddressBook");
            var modelForUpdate = _Mapper.Map<AddressBook>(model);
            _Uow.AddressBooks.Update(modelForUpdate);

            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Updated" });
            }
            return BadRequest();
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var AddressToDelete =await _Uow.AddressBooks.FirstOrDefault(p=>p.Id==id);
            if (AddressToDelete == null)
                return NotFound("Could't Found This AddressBook");
            _Uow.AddressBooks.Remove(AddressToDelete);
            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Deleted" });
            }
            return BadRequest();
        }




    }
}