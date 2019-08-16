# Scenario: Login page

#   Given I am a guest user
#   When I am visit the `/login`
#   And I enter "info@monkemedia.co.uk" in the "username" field
#   And I enter "1111qqqq" in the "password" field
#   And I press the "login" button
#   Then "authentication" would be "true"

Feature: Google Search

Scenario: Searching Google

  Given I open Google's search page
  Then the title is "Google"
  And the Google search form exists