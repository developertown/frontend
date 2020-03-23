# Code Review

DeveloperTown projects **must** utilize a code review process.

## Why do Code Review

Code review helps developers learn the code base, as well as help them learn new technologies and techniques that grow their skill sets.
Like writing tests and using linters code review is another way we ensure quality and consistency.

## What to look for during a Review?

1. Formatting and styling consistency (see [formatting.md](./react/formatting.md) and [linting.md](./react/linting.md) for ways to automate this)
2. Naming conventions of variables, functions, files.
3. File organization
4. Is the code easy to understand for the reviewer.  Be thinking about the future developer, in 6mos will this code still make sense?
5. Does the code do what is intended? Consider running the code yourself to test it out and prove that it works.
6. Does the code have appropriate test coverage?

## Best Practices for Code Review

### Keep Code Reviews small

At DeveloperTown we **should** be planning our work in small enough chunks that it would be reasonable to request a Code Review once or twice per day.  
On occasion a feature is large or has many components that all need to ship together.  In these scenarios we can still work incrementally by creating Code Reviews 
against an temporary integration branch (not develop).  Once the full feature is complete a pull request can be created from the temporary integration branch to develop.
We should try to avoid long lived integration branches since these are harder to integrate in general.

1. Smaller code reviews are faster to review
2. Smaller code reviews are easier to integrate with the larger code base (fewer merge conflicts)
3. Smaller code changes can increase velocity especially on large teams. 

### Review your own code

Be your own first reviewer, you will be suprised the things you catch yourself.  This can save time for others.

1. Leave comments for your team if a piece of code is particularly important.  This will help the review team focus their time
2. Leave comments to clarify context that may not be immediately visible by the diff.  This will help the review team understand how a piece of code is used in the larger application.
3. Leave comments for your team on code that might be confusing. This will help the review team think through suggestions for how to making confusing code more clear

### Add a good description to your Pull Request

Every pull request is created for a reason.  Providing the motivation behind the code change is helpful context for the review team.

1. Add a link to the story or bug fix that prompted the code change.  This will give the reviewer access to the business objectives and acceptance critera for a particular code change
2. Add screenshots.  Screenshots are an easy way to explain what is impacted by the code change and can save time in proving the new code looks correct
3. Add a video demo.  Videos are a great way to show the reviewer the code works as intended without requiring the code reviewer to run the code themsleves.

### Code Review is a conversation

* Code review should be a conversation.  Not every comment needs to be addressed with a code change.  It can and is acceptable to have a conversation and reach agreement between the author/reviewer
* Code review is an opportunity to learn.  It is ok to ask questions about a bit of code if its new to you.  Worse case you learn something, best case you provide the author with another perspective and the code improves as a result
* Comments can be kudos too, don’t be afraid to let the author know you learned something or thought something was done well.
