# What it is for?

There was a question on [NestJS discord](https://discord.com/channels/520622812742811698/600976791452254209/97612979100885407) how to 
handle overriding nested service with behavior we do not actually want to 
execute during our test.

```
Can we mock a "nested" dependency?
```

This is reasonable when we would otherwise call external API, send email or 
interact with anything that we should not.

# Homework

While it is possible, we should really think if this is reasonable to drop 
"black box" to that degree. For example, in original question, we most 
likely call external API directly, do some response mapping and so on. It 
**may** be more suitable to fake network calls to keep the underlying 
service being still tested along the way. While we possibly "reveal" more 
(we still reach to internal implementation details) we can test this way more.

It is also not possible in every case - for example while using some SDK or 
while calls are too complicated.

# Disclarimer

As original question was around e2e testing, example in the repo resembles 
"common unit test" (or rather: integration without infrastructure). I 
decided to keep it more close to original question, but it does not matter.
