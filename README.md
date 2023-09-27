# AutoChangelog by [Trigger.dev](https://trigger.dev)

Welcome to AutoChangelog! Try it for free [here](https://autochangelog.dev).

## Contributing

First, install dependencies and run the development server:

```bash
npm i
npm run dev
```

For this step, you may need to [create an account on Trigger.dev](https://cloud.trigger.dev/login?redirectTo=%2F). You can log in with your GitHub account.

To link the **jobs/** directory to [Trigger.dev](https://trigger.dev), clone and populate the **.env** file with your Trigger.dev keys, then run the [Trigger.dev CLI](https://trigger.dev/docs/documentation/guides/cli):

```bash
cp .env.example .env.local
npx @trigger.dev/cli@latest dev
```

This may require installing or updating the CLI. When linked, you should see a message like this:

```text
✅ Detected TriggerClient id: jobs-abcd
✅ Found API Key in .env.local file
✅ Created tunnel: abc123.ngrok.app

```

Open [localhost:3000](http://localhost:3000) in your browser to see the result.

## Learn More

To learn more about Trigger.dev, see our Getting Started guide!

- [Trigger.dev Documentation](https://trigger.dev/docs/documentation/introduction) - learn about the Trigger.dev platform and SDK.
- [Trigger.dev Next.js quickstart](https://trigger.dev/docs/documentation/quickstarts/nextjs) - the fastest way to learn.

You can check out [the Trigger.dev GitHub repository](https://github.com/triggerdotdev/trigger.dev) - your feedback and contributions are welcome!

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/triggerdotdev/autochangelog&env=TRIGGER_API_KEY,TRIGGER_API_URL,NEXT_PUBLIC_CLIENT_TRIGGER_API_KEY,NEXT_PUBLIC_TRIGGER_API_URL,OPENAI_API_KEY,GITHUB_TOKEN&envDescription=Sign%20up%20for%20Trigger.dev%20and%20OpenAI.%20Access%20to%20GPT-4%20is%20recommended.&envLink=https://trigger.dev/&project-name=autochangelog&repository-name=autochangelog&demo-title=AutoChangelog&demo-url=https://autochangelog.dev)
