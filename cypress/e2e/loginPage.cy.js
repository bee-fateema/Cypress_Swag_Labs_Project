describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/index.html");
  });

  it("Standard User successful login", () => {
    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("#login-button").click();
    cy.location("pathname").should("eq", "/v1/inventory.html");
  });

  it("Locked Out User failed login", () => {
    cy.get("[data-test='username']").type("locked_out_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("[data-test='error']")
      .invoke("text")
      .then((text) => {
        expect(text).to.be.oneOf([
          "Epic sadface: Sorry, this user has been locked out.",
        ]);
      });
  });

  it("Problem User failed login", () => {
    cy.get("[data-test='username']").type("problem_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("#login-button").click();
    cy.location("pathname").should("eq", "/v1/inventory.html");
  });

  it("Performance Glitch User failed login", () => {
    cy.get("[data-test='username']").type("performance_glitch_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("#login-button").click();
    cy.location("pathname").should("eq", "/v1/inventory.html");
  });

  it("Incorrect User failed login", () => {
    cy.get("[data-test='username']").type("Incorrect_user");
    cy.get("[data-test='password']").type("secet_sauce");
    cy.get("#login-button").click();
    cy.get("[data-test='error']")
      .invoke("text")
      .then((text) => {
        expect(text).to.be.oneOf([
          "Epic sadface: Username and password do not match any user in this service",
        ]);
      });
  });
});
