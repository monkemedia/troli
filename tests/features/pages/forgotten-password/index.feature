Feature: Forgotten password page

  Scenario: Viewing the Login page

    Given I visit the "Forgotten password page"
    Then I see a "forgotten password page"

  Scenario: I submit my email address
    Given I visit the "Forgotten password page"
    When I enter "test@test.com" in the "email box"
    And I click the "send reset password button"
    And I wait 2 seconds
    Then I see an "alert notification" with the text "Please check your email and click on the provided link to reset your password."
  
  Scenario: I submit without using a email address
    Given I visit the "Forgotten password page"
    When I enter "" in the "email box"
    And I click the "send reset password button"
    And I wait 2 seconds
    Then I see an "email error"
