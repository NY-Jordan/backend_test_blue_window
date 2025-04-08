import taskSeeder from "./task.status.seeder.ts";


async function main() {
    taskSeeder()
}

main()
  .catch((e) => {
    console.error(e);
  })
  