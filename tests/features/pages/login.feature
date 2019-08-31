Feature: Login page

  Scenario: Viewing the Login page

    Given I visit the "Login page"
    Then I see a "login page"

  Scenario: I login in successfully
    Given I visit the "Login page"
    When I enter email in the email box
    And I enter password in the password box
    And I click the "login button"
    And I wait 3 seconds
    Then I see the "homepage"
  
  Scenario: I login in with wrong email
    Given I visit the "Login page"
    When I enter "mmonkey@monkey.com" in the "email box"
    And I enter password in the password box
    And I click the "login button"
    And I wait 3 seconds
    Then I see an "alert notification" with the text "Unable to verify customer."

  Scenario: I login in with wrong password
    Given I visit the "Login page"
    When I enter email in the email box
    And I enter "password" in the "password box"
    And I click the "login button"
    And I wait 2 seconds
    Then I see an "alert notification" with the text "Unable to verify customer."

  Scenario: I forgotten my password
    Given I visit the "Login page"
    When I click the "forgotten password link"
    And I wait 2 seconds
    Then I visit the "forgotten password" page

  Scenario: I am a new customer
    Given I visit the "Login page"
    When I click the "create account now button"
    And I wait 2 seconds
    Then I visit the "register" page
