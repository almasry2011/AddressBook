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
    public class TitlesController : ControllerBase
    {
        private readonly IUnitOfWork _Uow;
        private readonly IMapper _Mapper;

        public TitlesController(IUnitOfWork uow, IMapper mapper)
        {
            _Uow = uow;
            _Mapper = mapper;
        }

     
        [HttpGet("GetTitles")]
        public async Task<IActionResult> GetDepartments()
        {
            var res = await _Uow.Titles.GetAll();
            if (res.Any())
            {
                var returnModel = _Mapper.Map<List<TitleDto>>(res);
                return Ok(returnModel);
            }
            return BadRequest();
        }



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody]TitleDto model)
        {
            var modelForAdd = _Mapper.Map<Title>(model);
            _Uow.Titles.Add(modelForAdd);

            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Added" });
            }
            return BadRequest();
        }



        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody]TitleDto model)
        {
            var isExist = await _Uow.Titles.FirstOrDefault(p => p.Id ==model.Id);
            if (isExist == null)
                return NotFound("Could't Found This Title");
            var modelForUpdate = _Mapper.Map<Title>(model);
            _Uow.Titles.Update(modelForUpdate);

            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Updated" });
            }
            return BadRequest();
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var EntityforDelete = await _Uow.Titles.FirstOrDefault(p => p.Id == id);
            if (EntityforDelete == null)
                return NotFound("Could't Found This Title");
 
            _Uow.Titles.Remove(EntityforDelete);
            if (await _Uow.Save())
            {
                return Ok(new { Status = true, Message = "Successfully Deleted" });
            }
            return BadRequest();
        }











    }
}