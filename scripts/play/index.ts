import { createServer } from "vite";
import { join } from "node:path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const workDir = join(process.cwd(), "packages", "simm-firebase-chat");

const bootstrap = async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: workDir,
    server: {
      port: 1337,
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            content: [join(workDir, "src/**/*.ts")],
          }), // Pass your custom Tailwind config
          autoprefixer,
        ],
      },
    },
  });
  await server.listen();

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
};

bootstrap();
