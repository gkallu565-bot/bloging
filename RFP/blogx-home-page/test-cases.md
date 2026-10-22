# BlogX Home Page Test Cases

| ID | Scenario | Expected result | Level |
| --- | --- | --- | --- |
| TC-01 | Open the home page | Page loads without an error and displays the BlogX home page | E2E |
| TC-02 | Inspect the header | `BlogX` and `Sign up` are visible | E2E |
| TC-03 | Count blog cards | Exactly 10 blog cards are visible | E2E |
| TC-04 | Inspect card content | Every card contains a category, title, excerpt, author, and date | E2E |
| TC-05 | Use the Sign Up control | The control is visible and navigates to the signup target | E2E |
| TC-06 | View a mobile-width layout | Content remains readable and cards stack without horizontal overflow | E2E |
| TC-07 | Build the application | The production build finishes successfully | Build |
| TC-08 | Inspect the browser console | No application errors are reported | E2E |
