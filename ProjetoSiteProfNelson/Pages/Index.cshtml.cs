using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ProjetoSiteProfNelson.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        [BindProperty]
        public string NomeItem { get; set; }

        [BindProperty]
        public string Descricao { get; set; }

        [BindProperty]
        public string Origem { get; set; }

        [BindProperty]
        public string Referencia { get; set; }

        [BindProperty]
        public IFormFile Imagem { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            _logger.LogInformation("Tentando enviar email...");
            try
            {
                using (var smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("mafjacinto2007@gmail.com", "tngf ygia oetj vwrm");
                    smtp.EnableSsl = true;

                    var mensagem = new MailMessage
                    {
                        From = new MailAddress("mafjacinto2007@gmail.com"),
                        Subject = $"Novo Item Submetido: {NomeItem}",
                        Body = $"Nome do Item: {NomeItem}\n" +
                               $"Descrição: {Descricao}\n" +
                               $"Origem: {Origem}\n" +
                               $"Referência: {Referencia}\n" +
                               $"Data: {DateTime.Now}",
                        IsBodyHtml = false
                    };

                    mensagem.To.Add("mafjacinto2007@gmail.com");

                    if (Imagem != null && Imagem.Length > 0)
                    {
                        _logger.LogInformation("Anexando imagem: {FileName}", Imagem.FileName);

                        var ms = new MemoryStream();
                        await Imagem.CopyToAsync(ms);
                        ms.Position = 0;
                        mensagem.Attachments.Add(new Attachment(ms, Imagem.FileName));
                    }

                    await smtp.SendMailAsync(mensagem);
                }

                _logger.LogInformation("Item enviado com sucesso.");
                TempData["Mensagem"] = "Item enviado com sucesso!";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar o item.");
                TempData["Mensagem"] = "Erro ao enviar o item: " + ex.Message;
            }

            return RedirectToPage();
        }
    }
}