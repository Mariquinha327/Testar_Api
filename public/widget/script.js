(function() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('userId');
  const apiUrl = '${process.env.NEXT_PUBLIC_API_URL}';

  if (!userId) {
    console.error('User ID is required');
    return;
  }

  // Carregar configuração
  fetch(`${apiUrl}/api/ia/config?userId=${userId}`)
    .then(res => res.json())
    .then(config => {
      createWidget(config);
    })
    .catch(err => {
      console.error('Error loading widget config:', err);
    });

  function createWidget(config) {
    const widget = document.createElement('div');
    widget.id = 'ai-widget-container';
    widget.style.position = 'fixed';
    widget.style[config.widget_position.split('-')[0]] = '20px';
    widget.style[config.widget_position.split('-')[1]] = '20px';
    widget.style.backgroundColor = config.color_scheme;
    widget.style.borderRadius = '50%';
    widget.style.width = '60px';
    widget.style.height = '60px';
    widget.style.display = 'flex';
    widget.style.alignItems = 'center';
    widget.style.justifyContent = 'center';
    widget.style.cursor = 'pointer';
    widget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    widget.style.zIndex = '9999';

    const icon = document.createElement('div');
    icon.innerHTML = '🤖';
    icon.style.fontSize = '24px';
    widget.appendChild(icon);

    widget.addEventListener('click', () => openChat(config));
    document.body.appendChild(widget);
  }

  function openChat(config) {
    // Implementar chat UI aqui usando Cohere
    console.log('Opening chat with personality:', config.personality);
  }
})();