# UX and Moodle review

Prepared against upstream main 53bbac936d282889df63fa0d8dbe9a2f9d619a2f.

## Review journeys
- Home: member photo and last visit, outstanding actions, credit/access/account summaries; display preferences collapsed.
- Account: jump links to membership/money, access/training, and details/security. Summary values are not repeated below.
- Navigation: active section on nested pages, readable page title, skip link, grouped finance navigation.
- Equipment: access and course action first; servicing, status and usage history expandable. Paginated history opens automatically.
- Registration: section overview, anchored error summary, rules link.
- Mobile: readable labels and controls, larger actions, scroll-contained tables.

## Link a machine to Moodle
1. Open the machine in Django Admin, under Equipment.
2. In Training and charges, enter the Moodle course ID (the number after id= in the real course URL).
3. Review course-required-since and existing-member requirements before saving. This is the existing training prerequisite field, not an optional reference link.
4. The member machine page and online-training page show a course button, including after completion.

Course URLs use the configured Moodle address, or https://learning.buildbrighton.com when blank.
The link fallback does not enable API completion checking or SSO.
For completion checking, configure the Moodle address and MOODLE_TOKEN using the existing deployment process.
No course IDs, credentials or completion records are invented or changed by this branch.

## Validation
Automated checks run on the review branch. A rendered desktop/mobile review is still required before a PR.
No live settings or deployment are changed.
