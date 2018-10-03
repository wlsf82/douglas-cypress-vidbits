Cypress.Commands.add("seedDbWithVideo", () => {
  cy.server();
  cy.request({
    method: "POST",
    url: "/videos",
    form: true,
    body: {
      title: "Agile testing",
      description: "A quality culture in the company’s core business",
      url: "https://www.youtube.com/embed/JLam9R9YwpE"
    }
  });
});

Cypress.Commands.add("getVideoIdFromHomePage", () => {
  cy.request({
    method: "GET",
    url: "/"
  }).then(response => getVideoIdFromHtml(response));
});

function getVideoIdFromHtml(html) {
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(html.body, "text/html");
  const video = htmlDocument.documentElement.querySelector(".video-title a");
  return video.href.replace(`${Cypress.config("baseUrl")}/videos/`, "");
}
