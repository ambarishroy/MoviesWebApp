import truncate from "lodash/truncate";

export const excerpt = (string: string) => {
    return truncate(string, {
        length: 400, // maximum 400 characters
        separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
    });
}

