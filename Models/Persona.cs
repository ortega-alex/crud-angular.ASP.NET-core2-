using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.web.Models
{
    public class Persona
    {
        public Persona()
        {

        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public List<Direccion> Direcciones { get; set; }
    }
}
