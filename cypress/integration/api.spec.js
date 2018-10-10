describe("API", () => {
  beforeEach(() => cy.server());

  context("GET", () => {
    context("/", () => {
      it("returns 302 status code (redirect) and redirects to '/videos'", () => {
        cy.request({
          method: "GET",
          url: "/",
          followRedirect: false
        }).then(res => {
          expect(res.status).to.eq(302);
          expect(res.redirectedToUrl).to.eq(
            `${Cypress.config("baseUrl")}/videos`
          );
        });
      });
    });

    context("/videos", () => {
      it("returns 200 status code (success)", () => {
        cy.request({
          method: "GET",
          url: "/videos"
        }).then(res => expect(res.status).to.eq(200));
      });
    });

    context("/videos/create", () => {
      it("returns 200 status code (success)", () => {
        cy.request({
          method: "GET",
          url: "/videos/create"
        }).then(res => expect(res.status).to.eq(200));
      });
    });

    context("/foo", () => {
      it("returns 404 status code (not found)", () => {
        cy.request({
          method: "GET",
          url: "/foo",
          failOnStatusCode: false
        }).then(res => expect(res.status).to.eq(404));
      });
    });

    context("drop db and seed db with video before each", () => {
      beforeEach(() => {
        cy.exec("npm run drop-db");
        cy.seedDbWithVideo();
      });

      context("/video/:id", () => {
        it("returns 200 status code (success) and video title on body", () => {
          cy.getVideoIdFromHomePage().then(videoId => {
            cy.request({
              method: "GET",
              url: `/videos/${videoId}`
            }).then(res => {
              expect(res.status).to.eq(200);
              expect(res.body).to.include("Agile testing");
            });
          });
        });
      });

      context("/video/:id/edit", () => {
        it("returns 200 status code (success) and video title on body", () => {
          cy.getVideoIdFromHomePage().then(videoId => {
            cy.request({
              method: "GET",
              url: `/videos/${videoId}/edit`
            }).then(res => {
              expect(res.status).to.eq(200);
              expect(res.body).to.include("Agile testing");
            });
          });
        });
      });
    });
  });

  context("POST", () => {
    context("/videos", () => {
      it("returns 400 status code (bad request)", () => {
        cy.request({
          method: "POST",
          url: "/videos",
          failOnStatusCode: false
        }).then(res => expect(res.status).to.eq(400));
      });
    });

    context("seed db with video before each", () => {
      beforeEach(() => cy.seedDbWithVideo());

      context("/videos/:id/edit", () => {
        it("returns 400 status code (bad request)", () => {
          cy.getVideoIdFromHomePage().then(videoId => {
            cy.request({
              method: "POST",
              url: `/videos/${videoId}/edit`,
              failOnStatusCode: false
            }).then(res => {
              expect(res.status).to.eq(400);
            });
          });
        });
      });
    });

    context("dropping db before each", () => {
      beforeEach(() => cy.exec("npm run drop-db"));

      context("/videos", () => {
        it("returns 201 status code (created) and video title on body", () => {
          cy.request({
            method: "POST",
            url: "/videos",
            form: true,
            body: {
              title: "Agile testing",
              description: "A quality culture in the company’s core business",
              url: "https://www.youtube.com/embed/JLam9R9YwpE"
            }
          }).then(res => {
            expect(res.status).to.eq(201);
            expect(res.body).to.include("Agile testing");
          });
        });
      });

      context("seed db with video before each", () => {
        beforeEach(() => cy.seedDbWithVideo());

        context("/videos/:id/edit", () => {
          it("returns 302 status code (redirect) and redirects to '/videos/:id'", () => {
            cy.getVideoIdFromHomePage().then(videoId => {
              cy.request({
                method: "POST",
                url: `/videos/${videoId}/edit`,
                followRedirect: false,
                form: true,
                body: {
                  title: "Chaos and intuition engineering",
                  description:
                    "GOTO 2016 • Chaos & Intuition Engineering at Netflix • Casey Rosenthal.",
                  url: "https://www.youtube.com/embed/Q4nniyAarbs"
                }
              }).then(res => {
                expect(res.status).to.eq(302);
                expect(res.redirectedToUrl).to.eq(
                  `${Cypress.config("baseUrl")}/videos/${videoId}`
                );
              });
            });
          });
        });

        context("/videos/:id/delete", () => {
          it("returns 302 status code (redirect) and redirects to '/'", () => {
            cy.getVideoIdFromHomePage().then(videoId => {
              cy.request({
                method: "POST",
                url: `/videos/${videoId}/delete`,
                followRedirect: false
              }).then(res => {
                expect(res.status).to.eq(302);
                expect(res.redirectedToUrl).to.eq(
                  `${Cypress.config("baseUrl")}/`
                );
              });
            });
          });
        });
      });
    });
  });
});
