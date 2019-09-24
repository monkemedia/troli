Feature: Confirm account page

  Scenario: Viewing Confirm account page

    Given I visit the "Confirm account page"
    Then I see a "confirm account page"

  Scenario: I submit my email address
    Given I visit the "Confirm account page"
    When I enter "test@test.com" in the "email box"
    And I click the "send confirmation link button"
    And I wait 2 seconds
    Then I see an "alert notification" with the text "Please check your email and click on the provided link to confirm your account."
  
  Scenario: I submit without using a email address
    Given I visit the "Confirm account page"
    When I enter "" in the "email box"
    And I click the "send confirmation link button"
    And I wait 2 seconds
    Then I see an "email error"

  Scenario: I submit the wrong email address
    Given I visit the "Confirm account page"
    When I enter "ff@ff.com" in the "email box"
    And I click the "send confirmation link button"
    And I wait 2 seconds
    Then I see an "alert notification" with the text "Please check your email and click on the provided link to confirm your account."