Feature: Select language 

  Scenario: Change language

    Given I visit the "homepage"
    And I hover the "language selector button"
    And I click on "Netherlands"
    Then the lang meta should be "nl"