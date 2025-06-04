# SOLUTION

## Estimation

Estimated: 5 hours

Spent: 6 hours

## Solution

I created distinct types for API requests and responses.

Filters are implemented as controlled fields:

- selector for tags
- checkbox for subscription
- a pair of numeric inputs for the price range

Changing filters does not refresh the page.

Component App.tsx:

- I store filters, currentPage, productData, loading and error in useState.
- When changing filters, I reset the page to 1.
- The request is executed in useEffect, where fetchProducts is called with the current parameters.
- The ProductCard component displays a list of products.
- Pagination control is implemented through the "Previous" and "Next" buttons.

The user receives data without delays and without unnecessary transitions
