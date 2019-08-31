Feature: Reset password

  Scenario: Viewing the reset password page

    Given I visit the "Reset password page"
    Then I see a "reset password page"

  Scenario: I submit my password correctly but token has expired
    Given I visit the "Reset password page"
    And I enter "password" in the "password box"
    And I enter "password" in the "confirm password box"
    And I click the "reset password button"
    And I wait 1 seconds
    Then I see an "alert notification" with the text "Token has expired."
  
  Scenario: I submit my password with passwords that don't match
    Given I visit the "Reset password page"
    And I enter "password" in the "password box"
    And I enter "password1" in the "confirm password box"
    And I click the "reset password button"
    And I wait 1 seconds
    Then I see an "alert notification" with the text "Passwords do not match."
