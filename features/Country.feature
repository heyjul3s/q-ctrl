Feature: Country

Scenario 1: Country loading
  Given I am on the country page
  When the country hasn't finished loading
  Then I should see a loading spinner

Scenario 2: Country loaded
  Given I am on the country page
  When the country has finished loading
  Then I should see the country's flag
    And the country's name
    And the country's population
    And the country's demonym