@GitHub @Smoke @Login
Feature: Login functonality in GitHub

    @Instructor
    Scenario: Login as Instructor and Logout
        Given I login to GitHub as "instructor"
        When I logout of GitHub

    @UndefinedStep
    Scenario: Login as Instructor and Logout
        Given I login to GitHub as "instructor"
        # When I run a undefined step
        And I logout of GitHub

    @Visual
    Scenario: Login as Instructor and Logout
        Given I login to GitHub as "instructor"
        Then Expected page "Account" should match actual
        And I logout of GitHub

    
