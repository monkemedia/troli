Feature: Select language 

  Scenario: Change language to Dutch

    Given I visit the "homepage"
    When I hover the "language selector button"
    And I click on "Netherlands"
    Then the lang meta should be "nl"
  
  Scenario: Change language to English

    Given I visit the "homepage"
    When I hover the "language selector button"
    And I click on "English"
    Then the lang meta should be "en"