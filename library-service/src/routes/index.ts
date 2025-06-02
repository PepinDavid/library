import { IRootRoutes } from "../interfaces/routes.interface";
import { authenticateTokenMiddleware } from "../middlewares/authenticateToken.middleware";
import { connexionRoutes } from "./auth.route";
import { authorBookRoutes } from "./author-book.route";
import { authorRoutes } from "./author.route";
import { bookRoutes } from "./book.route";
import { borrowedBookRoutes } from "./borrowedBoook.route";
import { genreBookRoutes } from "./genre-book.route";
import { genreRoutes } from "./genre.route";
import { userRoutes } from "./user.route";


export const apiRoutes: IRootRoutes[] = [
    {
        name: 'public',
        middleware: [],
        routes: [
            connexionRoutes,
        ],
    },
    {
        name: 'api',
        middleware: [
            authenticateTokenMiddleware,
        ],
        routes: [
            authorRoutes,
            bookRoutes,
            borrowedBookRoutes,
            genreRoutes,
            userRoutes,
            authorBookRoutes,
            genreBookRoutes,
        ],
    },
];
