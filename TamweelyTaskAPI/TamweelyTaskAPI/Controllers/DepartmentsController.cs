using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TamweelyTaskAPI.Data;
using TamweelyTaskAPI.Dto_s;
using TamweelyTaskAPI.Model;
using TamweelyTaskAPI.Repositories.UnitOfWork;

namespace TamweelyTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentsController : ControllerBase
    {
        private readonly IUnitOfWork _Uow;
        private readonly IMapper _Mapper;

        public DepartmentsController(IUnitOfWork uow, IMapper mapper)
        {
            _Uow = uow;
            _Mapper = mapper;
        }

       [Authorize]
        [HttpGet("GetDepartments")]
        public async Task<IActionResult> GetDepartments()
        {
            var res = await _Uow.Departments.GetAll();
            if (res.Any())
            {
                var returnModel = _Mapper.Map<List<DepartmentDto>>(res);
                return Ok(returnModel);
            }
            return BadRequest();
        }
 


        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody]DepartmentDto model)
        {
            var modelForAdd = _Mapper.Map<Department>(model);
            _Uow.Departments.Add(modelForAdd);

            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Added" });
            }
            return BadRequest();
        }



        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody]DepartmentDto model)
        {
            var isExist =await _Uow.Departments.FirstOrDefault(p => p.Id ==model.Id);
            if (isExist == null)
                return NotFound("Could't Found This Department");
            var modelForUpdate = _Mapper.Map<Department>(model);
            _Uow.Departments.Update(modelForUpdate);

            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Updated" });
            }
            return BadRequest();
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var EntityforDelete = await _Uow.Departments.FirstOrDefault(p => p.Id == id);
            if (EntityforDelete == null)
                return NotFound("Could't Found This Department");
            _Uow.Departments.Remove(EntityforDelete);
            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Deleted" });
            }
            return BadRequest();
        }




    }
}