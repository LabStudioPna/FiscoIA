(function() {
  const WEBHOOK_URL = 'https://vps-6064485-x.dattaweb.com/webhook/labstudio-visitas';
  const getLandingName = () => {
    const path = window.location.pathname.split('/')[1].toLowerCase();
    if (path === 'constructoria') return 'ConstructorIA';
    if (path === 'fiscoia') return 'FiscoIA';
    if (path === 'campoia') return 'CampoIA';
    if (path === 'mipropia') return 'MiPropIA';
    if (!path) return 'LABStudio';
    return 'Desconocida';
  };
  const trackView = () => {
    const params = new URLSearchParams({ landing: getLandingName(), pagina: window.location.href });
    fetch(`${WEBHOOK_URL}?${params.toString()}`, { method: 'GET' }).catch(() => {});
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackView);
  } else {
    trackView();
  }
})();
