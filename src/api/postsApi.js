const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=20';

// Bộ dữ liệu 20 bài viết chuẩn phòng hờ khi mất mạng hoặc API bên ngoài bị timeout
const FALLBACK_POSTS = [
  {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit',
  },
  {
    userId: 1,
    id: 5,
    title: 'nesciunt quas odio',
    body: 'repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque',
  },
  {
    userId: 1,
    id: 6,
    title: 'dolorem eum magni eos aperiam quia',
    body: 'ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae',
  },
  {
    userId: 1,
    id: 7,
    title: 'magnam facilis autem',
    body: 'dolore placeat quibusdam ea quo vitae magni quis enim qui quis quo nemo aut saepe quidem repellat excepturi ut quia sunt ut sequi eos ea sed quas',
  },
  {
    userId: 1,
    id: 8,
    title: 'dolorem dolore est ipsam',
    body: 'dignissimos aperiam dolorem qui eum facilis quibusdam animi sint suscipit qui sint possimus cum quaerat magni maiores excepturi ipsam ut commodi dolor voluptatum modi aut vitae',
  },
  {
    userId: 1,
    id: 9,
    title: 'nesciunt iure omnis dolorem tempora et accusantium',
    body: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas',
  },
  {
    userId: 1,
    id: 10,
    title: 'optio molestias id quia eum',
    body: 'quo et expedita modi cum officia vel magni doloribus qui repudiandae vero nisi sit quos veniam quod sed accusamus veritatis error',
  },
  {
    userId: 2,
    id: 11,
    title: 'et ea vero quia laudantium autem',
    body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus accusamus in eum beatae sit vel qui neque voluptates ut commodi qui incidunt',
  },
  {
    userId: 2,
    id: 12,
    title: 'in quibusdam tempore odit est dolorem',
    body: 'itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem incidunt ea est distinctio odio',
  },
  {
    userId: 2,
    id: 13,
    title: 'dolorum ut in voluptas mollitia et saepe quo animi',
    body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque iste corrupti reiciendis voluptatem eius rerum sit cumque quod eligendi laborum minima',
  },
  {
    userId: 2,
    id: 14,
    title: 'voluptatem eligendi optio',
    body: 'fuga et accusamus dolorum perferendis illo voluptas non doloremque neque facere ad qui dolorum molestiae beatae sed aut voluptas totam sit illum',
  },
  {
    userId: 2,
    id: 15,
    title: 'eveniet quod temporibus',
    body: 'reprehenderit quos placeat velit minima officia dolores impedit repudiandae molestiae nam voluptas recusandae quis delectus officiis harum fugiat vitae',
  },
  {
    userId: 2,
    id: 16,
    title: 'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
    body: 'suscipit nam nisi quo aperiam aut asperiores eos fugit maiores voluptatibus quia voluptatem quis ullam qui in alias quia est consequatur magni mollitia accusamus ea nisi voluptate dicta',
  },
  {
    userId: 2,
    id: 17,
    title: 'fugit voluptas sed molestias voluptatem provident',
    body: 'eos voluptas et aut odit natus earum aspernatur fuga molestiae ullam deserunt ratione qui eos qui molestias inventore voluptatem quia omnis eaque inventore odit fugiat dicta voluptatem',
  },
  {
    userId: 2,
    id: 18,
    title: 'voluptate et itaque vero tempora molestiae',
    body: 'eveniet voluptatibus aut sit fugiat sit occaecati placeat commodi dolorem sit voluptatem voluptatem ipsum tempora molestiae dolorem est quas hic amet dolorem',
  },
  {
    userId: 2,
    id: 19,
    title: 'adipisci placeat illum aut reiciendis qui',
    body: 'illum quis cupiditate provident sit magnam ea sed aut omnis veniam maiores ullam consequatur atque adipisci quo iste expedita sit quos voluptas',
  },
  {
    userId: 2,
    id: 20,
    title: 'doloribus ad provident suscipit at',
    body: 'qui consequuntur ducimus possimus quisquam amet similique suscipit porro ipsam amet eos veritatis officiis exercitationem vel fugit aut necessitatibus totam omnis rerum consequatur expedita quidem cumque explicabo',
  },
];

export const postsApi = {
  /**
   * Gọi API công khai tải 20 bài viết từ JSONPlaceholder
   */
  async fetchPosts() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      console.log('[postsApi] Đang tải 20 bài viết từ:', API_URL);
      const response = await fetch(API_URL, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[postsApi] Tải thành công ${data.length} bài viết.`);
      return { success: true, data: data.slice(0, 20), source: 'api' };
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn('[postsApi] Lỗi mạng khi gọi API, sử dụng dữ liệu fallback dự phòng:', error.message);
      return {
        success: true,
        data: FALLBACK_POSTS,
        source: 'fallback',
        warning: 'Không thể kết nối đến máy chủ API, đang hiển thị dữ liệu dự phòng.',
      };
    }
  },
};
