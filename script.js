// Prendi userID dall'URL
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID') || 'anonimo';

// Funzione per inviare dati a Google Sheets
function inviaDati(prodotto, azione) {
  fetch('https://script.google.com/macros/s/AKfycbzXhmmMfRM72ki-cTNXWh7ida0lbDovCEn2g7XCe2V9vQN5COg4QbQt1A_vpcaSoYXE/exec', {
    method: 'POST',
    body: JSON.stringify({ userID, prodotto, azione }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => console.log('Dati inviati:', prodotto, azione));
}

// Traccia clic sui prodotti
document.querySelectorAll('.prodotto').forEach(prod => {
  prod.addEventListener('click', () => {
    inviaDati(prod.id, 'click');
  });
});

// Traccia aggiunte al carrello
document.querySelectorAll('button[id^="carrello"]').forEach(btn => {
  btn.addEventListener('click', () => {
    const prodottoID = btn.id.replace('carrello', 'prodotto');
    inviaDati(prodottoID, 'aggiunto_carrello');
  });
});
