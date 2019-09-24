Feature: Registration page

  Scenario: Viewing the Register page

    Given I visit the "Register page"
    Then I see a "register page"

  Scenario: I fill in the form correctly
    Given I visit the "Register page"
    When I enter "Joe" in the "first name box"
    And I enter "Bloggs" in the "last name box"
    And I enter "test@test.com" in the "email box"
    And I enter "password" in the "password box"
    And I enter "password" in the "confirm password box"
    And I click the "create account button"
    And I wait 2 seconds
    Then I should be on "Register thank you page"
