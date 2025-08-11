using Microsoft.AspNetCore.Mvc;
using ProjetoSiteProfNelson.Data;
using System.Text.Json;
using System.IO;

namespace ProjetoSiteProfNelson.Controller
{
    /*  Teste Concecção
     
    [ApiController]
    [Route("api")]
    public class TesteDbController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TesteDbController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("teste")]
        public IActionResult Testar()
        {
            try
            {
                var existe = _context.ITEMS.Any(); // Usa a tua entidade real
                return Ok("Ligação bem-sucedida.");
            }
            catch (Exception ex)
            {
                return BadRequest("Erro de ligação: " + ex.Message);
            }
        }
    }*/

    [ApiController]
    [Route("api")]
    public class DestaqueMensalController : ControllerBase
    {
        public class DestaqueMensal
        {
            public string UltimoMes { get; set; }
            public string UltimoEscolhido { get; set; }
        }
        private readonly AppDbContext _context;
        public DestaqueMensalController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("DestaqueMensal")]
        public IActionResult GetDestaqueMensal()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "destaque.json");
            var json = System.IO.File.ReadAllText(path);
            var dados = JsonSerializer.Deserialize<DestaqueMensal>(json);
            int mesJson = Convert.ToInt16(dados.UltimoMes);

            if (mesJson != DateTime.Now.Month)
            {
                mesJson = DateTime.Now.Month;

                int novoEscolhido = Convert.ToInt16(dados.UltimoEscolhido) + 1;

                if(novoEscolhido > _context.ITEMS.Count()) // Supondo que tens 10 itens
                {
                    novoEscolhido = 1; // Reinicia para o primeiro item
                }

                dados.UltimoMes = mesJson.ToString();

                dados.UltimoEscolhido = novoEscolhido.ToString();

                var novoJson = JsonSerializer.Serialize(dados, new JsonSerializerOptions { WriteIndented = true });
                System.IO.File.WriteAllText(path, novoJson);

            }

            try
            {
                int novoEscolhido = Convert.ToInt16(dados.UltimoEscolhido);
                var query = _context.ITEMS.FirstOrDefault(x => x.id == novoEscolhido);
                    
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao obter destaque mensal: " + ex.Message);
            }
        }

        [HttpGet("PatrimonioC")]
        public IActionResult GetPatrimonioC()
        {
            try
            {
                var query = _context.PATRIMONIOC.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao obter patrimônio: " + ex.Message);
            }
        }
        [HttpGet("Itens")]
        public IActionResult GetItens()
        {
            try
            {
                var query = _context.ITEMS.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao obter itens: " + ex.Message);
            }
        }
        [HttpGet("PalavraE")]
        public IActionResult GetPalavraE()
        {
            try
            {
                var query = _context.PALAVRAE.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao obter palavras: " + ex.Message);
            }
        }
    }
}