describe("Video", () => {
  beforeEach(() => {
    cy.exec("npm run drop-db");
    cy.seedDbWithVideo();
  });

  it("shows video's title and description, and iframe based on video's URL", () => {
    cy.getVideoIdFromHomePage().then(videoId => {
      cy.visit(`videos/${videoId}`);
      cy.get(".video-title").should("contain", "Agile testing");
      cy.get(".video-description").should(
        "contain",
        "A quality culture in the company’s core business"
      );
      cy.get("iframe.video-player").should(
        "have.prop",
        "src",
        "https://www.youtube.com/embed/JLam9R9YwpE"
      );
    });
  });

  it("shows a delete button and a edit link", () => {
    cy.getVideoIdFromHomePage().then(videoId => {
      cy.visit(`videos/${videoId}`);
      cy.get("button#delete").should("be.visible");
      cy.get(`a[href="/videos/${videoId}/edit"]#edit`).should("be.visible");
    });
  });

  it("redirects to the home page and shows no 'video-card' and iframe after video's deletion", () => {
    cy.getVideoIdFromHomePage().then(videoId => {
      cy.visit(`videos/${videoId}`);
      cy.get("button#delete").click();
      cy.url().should("be.equal", `${Cypress.config("baseUrl")}/videos`);
      cy.get(".video-card").should("not.exist");
      cy.get("iframe").should("not.exist");
    });
  });
});
