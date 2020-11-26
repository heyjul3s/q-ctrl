Feature: Countries

Scenario 1: Countries loading
  Given I am on the countries page
  When the countries haven't finished loading
  Then I should see a loading spinner

Scenario 2: Countries loaded
  Given I am on the countries page
  When the countries have finished loading
  Then I should see the first 10 countries in alphabetical order
    And display their country name

Scenario 3: Search
  Given I have entered text in the search input
  When I click the search button
  Then I should update the countries list to only show countries which contain the search text

Scenario 4: Hide next page button
  Given there are no more countries on the next page
  When the countries list has updated
  Then hide the button to paginate to the next page

Scenario 5: Hide previous page button
  Given there are no more countries on the previous page
  When the countries list has updated
  Then hide the button to paginate to the previous page

Scenario 6: Clicking the next page button
  Given the next page button is visible
  When I click on the next page button
  Then I should see the next 10 countries in alphabetical order

Scenario 7: Clicking the previous page button
  Given the previous page button is visible
  When I click on the previous page button
  Then I should see the previous 10 countries in alphabetical order

Scenario 8: Clicking a country
  Given the countries list has loaded
  When I click a country
  Then take me to that country's page