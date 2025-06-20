(function () {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.background = "#000";
  container.style.color = "#fff";
  container.style.padding = "15px";
  container.style.borderRadius = "10px";
  container.style.zIndex = "9999";
  container.innerText = "Olá! Como posso ajudar?";

  document.body.appendChild(container);
})();