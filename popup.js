document.addEventListener('DOMContentLoaded', function () {
    const cookieDiv = document.getElementById('cookieValue');
    const copyMessage = document.getElementById('copyMessage');
  
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = new URL(tabs[0].url);
      if (url.hostname.includes("linkedin.com")) {
        chrome.cookies.get({ url: "https://www.linkedin.com", name: "li_at" }, function (cookie) {
          if (cookie) {
            cookieDiv.innerText = cookie.value;
          } else {
            cookieDiv.innerText = "Cookie 'li_at' não encontrado. Certifique-se de estar logado no LinkedIn.";
          }
        });
      } else {
        cookieDiv.innerText = "Abra o LinkedIn para ver o valor do cookie.";
      }
    });
  
    // Evento de clique para copiar o valor do cookie
    cookieDiv.addEventListener('click', function () {
      const textToCopy = cookieDiv.innerText;
      if (textToCopy && !textToCopy.includes("não encontrado") && !textToCopy.includes("Abra o LinkedIn")) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          copyMessage.style.display = 'block';
          setTimeout(() => {
            copyMessage.style.display = 'none';
          }, 2000);
        }).catch(function (err) {
          console.error('Erro ao copiar o texto: ', err);
        });
      }
    });
  });
  