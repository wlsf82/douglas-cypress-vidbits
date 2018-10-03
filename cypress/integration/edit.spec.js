describe("Edit video", () => {
  beforeEach(() => {
    cy.exec("npm run drop-db");
    cy.seedDbWithVideo();
    cy.getVideoIdFromHomePage().then(videoId =>
      cy.visit(`videos/${videoId}/edit`)
    );
  });

  it("shows current video's title, description, and URL", () => {
    cy.get("#video-title-input").should("have.value", "Agile testing");
    cy.get("#video-description-input").should(
      "have.value",
      "A quality culture in the company’s core business"
    );
    cy.get("#video-url-input").should(
      "have.value",
      "https://www.youtube.com/embed/JLam9R9YwpE"
    );
  });

  it("redirects to video page and shows new video title when updating it", () => {
    const updatedTitle = "New title";

    cy.get("#video-title-input")
      .clear()
      .type(updatedTitle);
    cy.get(".edit-video-button#submit-button").click();
    cy.getVideoIdFromHomePage().then(videoId => {
      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/videos/${videoId}`
      );
      cy.get(".video-card .video-title h1").should("contain", updatedTitle);
    });
  });

  it("allows saving video without description", () => {
    cy.get("#video-description-input").clear();
    cy.get(".edit-video-button#submit-button").click();
    cy.get(".video-card .video-description").should("contain", "");
  });

  it("does not allow saving video without title or URL", () => {
    cy.get("#video-title-input").clear();
    cy.get(".edit-video-button#submit-button")
      .as("saveBtn")
      .click();
    cy.get(".error")
      .as("error")
      .should("be.visible")
      .and("have.length", 1);
    cy.get("#video-url-input").clear();
    cy.get("@saveBtn").click();
    cy.get("@error")
      .should("be.visible")
      .and("have.length", 2);
  });
});
