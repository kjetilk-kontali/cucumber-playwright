Feature: Edge Frontpage

    Scenario: Invalid input to trial request
        Given a user wants to request a trial on Edge
        When the user fills out the first name
        And submits the request
        Then an error message should be displayed