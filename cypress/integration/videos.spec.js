describe("Videos page", () => {
  beforeEach(() => cy.exec("npm run drop-db"));

  context("empty state", () => {
    it("shows no 'video-card' and iframe, and has a create button (with proper color) that leads to '/videos/create'", () => {
      cy.visit("/videos");

      cy.get(".video-card").should("not.exist");
      cy.get("iframe").should("not.exist");
      checksIfCreateBtnIsVisibleHasRightHrefValueAndProperBgColor();
    });
  });

  context("with video(s) state", () => {
    it("shows 2 videos inside iframes, and has a visible create button, with proper color, and that leads to '/videos/create'", () => {
      cy.exec("npm run seed-db");
      cy.visit("/videos");

      cy.get(".video-card").should("have.length", 2);
      cy.get("iframe").should("have.length", 2);
      checksIfCreateBtnIsVisibleHasRightHrefValueAndProperBgColor();
    });

    it("shows the video description as a link that leads to the video page", () => {
      cy.seedDbWithVideo();
      cy.getVideoIdFromHomePage().then(videoId => {
        cy.visit("/videos");

        cy.get(`.video-title a[href='/videos/${videoId}']`).should(
          "be.visible"
        );
      });
    });
  });

  function checksIfCreateBtnIsVisibleHasRightHrefValueAndProperBgColor() {
    cy.contains("Create")
      .should("be.visible")
      .and("to.have.prop", "href", `${Cypress.config("baseUrl")}/videos/create`)
      .and("to.have.css", "background-color", "rgb(255, 155, 52)");
  }
});
