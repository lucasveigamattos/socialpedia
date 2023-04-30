-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userPicturePath" TEXT NOT NULL,
    "picturePath" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" JSONB[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
