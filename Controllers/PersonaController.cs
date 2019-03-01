using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using angular.web.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace angular.web.Controllers
{
    [Produces("application/json")]
    //atenticacion por json web token
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/Personas")]
    public class PersonaController : Controller
    {
        private readonly ApplicationDbContext context;

        public PersonaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<Persona> GetPersonas()
        {
            return context.Personas;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersona([FromRoute] int id , bool inclurDireccion = false)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Persona persona;
            if (inclurDireccion)
                persona = await context.Personas.Include(x => x.Direcciones).SingleOrDefaultAsync(m => m.Id == id);
            else
                persona = await context.Personas.SingleOrDefaultAsync(m => m.Id == id);

            if (persona == null)
                return NotFound();

            return Ok(persona);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersona([FromRoute] int id , [FromBody] Persona persona)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != persona.Id)
                return BadRequest();

            context.Entry(persona).State = EntityState.Modified;
            try
            {
                await CrearOEditarDireccion(persona.Direcciones);
                await context.SaveChangesAsync();
            }
            catch (Exception) {
                if (!PersonaExist(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
         }

        [HttpPost]
        public async Task<IActionResult> PostPersona([FromBody] Persona persona)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            context.Personas.Add(persona);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetPersona", new { id = persona.Id }, persona);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersona([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var persona = await context.Personas.SingleOrDefaultAsync(m => m.Id == id);
            if (persona == null)
                return NotFound();

            context.Personas.Remove(persona);
            await context.SaveChangesAsync();

            return Ok(persona);
        }

        private bool PersonaExist(int id)
        {
            return context.Personas.Any(e => e.Id == id);
        }

        private async Task CrearOEditarDireccion(List<Direccion> direcciones)
        {
            List<Direccion> direccionesACrear = direcciones.Where(x => x.Id == 0).ToList();
            List<Direccion> direccionesAEditar = direcciones.Where(x => x.Id != 0).ToList();

            if (direccionesACrear.Any())
                await context.AddRangeAsync(direccionesACrear);

            if (direccionesAEditar.Any())
                context.UpdateRange(direccionesAEditar);
        } 
    }
}