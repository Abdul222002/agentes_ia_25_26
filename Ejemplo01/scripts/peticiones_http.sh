#!/bin/bash

    # Script para realizar un CRUD utilizando curl
    # Asegúrate de que el servidor esté corriendo en http://localhost:3000
    
BOOKS_URL="http://localhost:3000/books"
AUTHORS_URL="http://localhost:3000/authors"

echo "===== 1. CREATE BOOK ====="
curl -s -X POST "$BOOKS_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Refactoring",
    "authorId":1,
    "language":"English",
    "year":1999,
    "genre":"Software Engineering",
    "pages":431
  }'
echo -e "\n"

echo "===== 2. READ BOOK (id=9) ====="
curl -s -X GET "$BOOKS_URL/9"
echo -e "\n"

echo "===== 3. UPDATE BOOK (PUT id=9) ====="
curl -s -X PUT "$BOOKS_URL/9" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Refactoring (2nd Edition)",
    "authorId":1,
    "language":"English",
    "year":2020,
    "genre":"Software Engineering",
    "pages":450
  }'
echo -e "\n"

echo "===== 4. PATCH AUTHOR (id=3) ====="
curl -s -X PATCH "$AUTHORS_URL/3" \
  -H "Content-Type: application/json" \
  -d '{"nationality":"European"}'
echo -e "\n"

echo "===== 5. DELETE BOOK (id=9) ====="
curl -s -X DELETE "$BOOKS_URL/9"
echo -e "\n"
