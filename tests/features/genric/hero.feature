Feature: Hero banner
  
  Scenario: Clicking on `Next button`

    Given I visit the "homepage"
    And I see a "hero banner"
    When I click on "hero next button"
    Then I should see "hero slide 2"
    And I click on "hero next button"
    And I should see "hero slide 3"
  
  Scenario: Clicking on `previous button`

    When I click on "hero previous button"
    Then I should see "hero slide 2"
    And I click on "hero previous button"
    And I should see "hero slide 1"
