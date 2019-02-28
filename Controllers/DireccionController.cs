using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using angular.web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace angular.web.Controllers
{
    [Produces("application/json")]
    [Route("api/Direcciones")]
    public class DireccionController : Controller
    {
        private readonly ApplicationDbContext context;

        public DireccionController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpPost("delete/list")]
        public IActionResult DeleteList([FromBody] List<int> ids)
        {
            try
            {
                List<Direccion> direcciones = ids.Select(id => new Direccion() { Id = id }).ToList();
                context.RemoveRange(direcciones);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }
    }
}