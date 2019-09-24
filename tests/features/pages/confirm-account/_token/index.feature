Feature: Confirm account 

  Scenario: Viewing Confirm account page

    Given I visit "/confirm-account/abc"
    Then I see a "reset password page"
    And I see a "confirm account page loader"

  Scenario: Wrong token was used
    Given I visit "/confirm-account/abc"
    And I wait 2 seconds
    Then I should be on "Login page"
    And I see an "alert notification" with the text "Token has expired. Click here to send confirmation link."
  
  Scenario: The correct token was used
    Given I visit "/confirm-account/123"
    And I wait 2 seconds
    Then I should be on "Login page"
    And I see an "alert notification" with the text "Thank you for registering with us. Please sign in below."
