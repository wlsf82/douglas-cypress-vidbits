describe("Header", () => {
  it("logo has a link that leads to the home page and an image with 'VidBits' as the alt text", () => {
    cy.visit("/");
    cy.get(".title-container .title-logo a")
      .as("logoLink")
      .should("have.prop", "href", `${Cypress.config("baseUrl")}/`);
    cy.get("@logoLink")
      .get("img")
      .should("have.prop", "alt", "VidBits");
  });
});
