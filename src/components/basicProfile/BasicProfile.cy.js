import BasicProfile from './BasicProfile';

describe('BasicProfile', () => {

    it('mounts', () => {
      cy.mount(<BasicProfile />)
    });

    it('can have its form filled in completely, and its button clicked', () => {
      cy.mount(<BasicProfile />)
      cy.get('[data-test="name-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="email-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="position-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="languages-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="company-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="education-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="company-address-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="certification-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="interests-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="skills-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="experience-field"]').click().type("Itsa me, Mario")
      cy.get('[data-test="submit-button"]').click()
    });

    it('shows red "required" text if someone attempts to submit an empty form', () => {
      cy.mount(<BasicProfile />)
      cy.get('[data-test="submit-button"]').click()
      cy.contains('p', "Required").should("exist")
    });
});