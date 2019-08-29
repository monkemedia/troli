Feature: Select language 

  Scenario: Change language

    Given I visit the "homepage"
    And I click the "language selector button"
    And I see "Netherlands" in the "language selector list"
    And I click the "Netherlands button"
    And I wait 2 seconds
    # Then I should be on `/sv/search?query=`
    # And I see the text "Vad letar du efter?" in the `search box` placeholder