using Core.DomainModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Drawing.Imaging;
using System.IO;
using System.Linq.Expressions;
using Core.DomainModel.Settings;
using Microsoft.AspNetCore.Http;
using System.Drawing;
using Newtonsoft.Json;
using Core.DomainModel.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Core.DomainService
{
    public static class Utility
    {

        public static string GetConnectionString(IConfiguration config)
        {
            return config.GetConnectionString(Constant.AppSetting_DefaultConnection);
        }

        public static T GetApplicationSettingSecion<T>(IConfiguration config)
            where T : class, ISetting => config.GetSection(typeof(T).Name).Get<T>();

        public static string GetApplicationSetting(IConfiguration config, string key) =>
            config.GetSection(key).Value;

        public static Expression<Func<T, K>> GetRelatedPropertyExpression<T, K>(string property)
        {
            var param = Expression.Parameter(typeof(T), "q");
            var body = Expression.PropertyOrField(param, property);
            var lambda = Expression.Lambda<Func<T, K>>(body, param);

            return lambda;
        }

        #region Image

        public static string UploadImage(IFormFile file, string subFolderName) =>
            UploadFile(file, Path.Combine("Images", subFolderName));

        public static string UploadFile(IFormFile file, string resourceFolderPath)
        {
            var directoryRelativePath = Path.Combine("Resources", resourceFolderPath);
            var directoryFullPath = Path.Combine(Directory.GetCurrentDirectory(), directoryRelativePath);
            string fileName = GetUniqueFileName(file.FileName);
            if (!Directory.Exists(directoryFullPath))
            {
                Directory.CreateDirectory(directoryFullPath);
            }
            var fileFullPath = Path.Combine(directoryFullPath, fileName);
            using (var stream = new FileStream(fileFullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            string fileRelativePath = Path.Combine(directoryRelativePath, fileName);
            return fileRelativePath;
        }

        public static void DeleteFile(string fileRelativePath)
        {
            var fileFullPath = Path.Combine(Directory.GetCurrentDirectory(), fileRelativePath);
            if (File.Exists(fileFullPath))
            {
                File.Delete(fileFullPath);
            }
        }

        private static string GetUniqueFileName(string fileName)
        {
            string fullFileName = Path.GetFileName(fileName);
            return $"{ Guid.NewGuid().ToString() + Path.GetExtension(fullFileName) }";
        }

        /// <summary>
        /// If you want to save the file as bytearray/varbinary to your database, 
        /// you may convert the IFormFile object to byte array like this
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static byte[] GetByteArrayFromImage(IFormFile file)
        {
            using (var target = new MemoryStream())
            {
                file.CopyTo(target);
                return target.ToArray();
            }
        }

        // Resize an Image File   
        public static Bitmap ResizeImage(Stream fileStream, int width, int height)
            => ResizeImage(new Bitmap(fileStream), width, height);

        // Resize an Image File with preserve aspect ratio
        public static Bitmap ResizeRatioImage(Stream fileStream, int maxWidth, int maxHeight)
            => ResizeRatioImage(new Bitmap(fileStream), maxWidth, maxHeight);

        // Resize a Bitmap   
        public static Bitmap ResizeImage(Bitmap image, int width, int height)
        {
            Bitmap resizedImage = new Bitmap(width, height, PixelFormat.Format32bppRgb);
            using (Graphics gfx = Graphics.FromImage(resizedImage))
            {
                gfx.DrawImage(image, new Rectangle(0, 0, width, height),
                                     new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
            }
            image.Dispose();
            return resizedImage;
        }

        // Resize a Bitmap with preserve aspect ratio   
        public static Bitmap ResizeRatioImage(Bitmap image, int maxWidth, int maxHeight)
        {
            int newWidth = maxWidth;
            int newHeight = maxHeight;
            if ((decimal)image.Width / (decimal)maxWidth > (decimal)image.Height / (decimal)maxHeight)
            {
                newWidth = maxWidth;
                newHeight = (int)Math.Round((maxWidth / (double)image.Width) * image.Height);
            }
            else
            {
                newHeight = maxHeight;
                newWidth = (int)Math.Round((maxHeight / (double)image.Height) * image.Width);
            }

            Bitmap resizedImage = new Bitmap(newWidth, newHeight, PixelFormat.Format32bppRgb);
            using (Graphics gfx = Graphics.FromImage(resizedImage))
            {
                gfx.DrawImage(image, new Rectangle(0, 0, newWidth, newHeight),
                                     new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
            }
            image.Dispose();
            return resizedImage;
        }

        public static byte[] BitmapToBytes(Bitmap image)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                image.Save(stream, ImageFormat.Png);
                return stream.ToArray();
            }
        }

        #endregion /Image

        public static string GenerateCode()
        {
            string code = Guid.NewGuid().ToString();
            int length = 10; // Number of characters to generate
            code = code.Replace("-", String.Empty);
            code = code.Substring(0, length);

            return code;
        }

        public static string Pluralize(string text)
        {
            if (text.EndsWith("s") ||
                text.EndsWith("ch") ||
                text.EndsWith("sh") ||
                text.EndsWith("x") ||
                text.EndsWith("z"))
            {
                return $"{text}es";
            }
            if (text.EndsWith("f") ||
              text.EndsWith("fe"))
            {
                return $"{text}ves";
            }
            if (text.EndsWith("ay") ||
                text.EndsWith("ey") ||
                text.EndsWith("iy") ||
                text.EndsWith("oy") ||
                text.EndsWith("uy"))
            {
                return $"{text}s";
            }
            if (text.EndsWith("y"))
            {
                return $"{text}ies";
            }
            if (text.EndsWith("ao") ||
               text.EndsWith("eo") ||
               text.EndsWith("io") ||
               text.EndsWith("oo") ||
               text.EndsWith("uo"))
            {
                return $"{text}s";
            }
            if (text.EndsWith("o"))
            {
                return $"{text}es";
            }
            return $"{text}s";
        }

        public static TEntity Clone<TEntity, TKey>(this TEntity source)
            where TEntity : BaseEntity<TKey>
        {
            var serialized = JsonConvert.SerializeObject(source);
            return JsonConvert.DeserializeObject<TEntity>(serialized);
        }

        public static Task<IList<TSource>> ToIListAsync<TSource>(this IQueryable<TSource> source,
            CancellationToken cancellationToken = default) =>
            source.ToListAsync(cancellationToken)
                 .ContinueWith<IList<TSource>>(q => q.Result, TaskContinuationOptions.ExecuteSynchronously);

        public static void TrimCharProperties(Type type, object obj)
        {
            var properties = type.GetProperties()
                .Where(q => q.PropertyType == typeof(string) ||
                            q.PropertyType == typeof(char)); // Obtain all string & char properties

            foreach (var prop in properties) // Loop through properties
            {
                object propertyValue = prop.GetValue(obj);
                if ((propertyValue ?? string.Empty).ToString() == string.Empty)
                {
                    continue;
                }
                Type propertyType = prop.PropertyType;
                var newPropValue = Convert.ChangeType(propertyValue.ToString().Trim(), propertyType);
                prop.SetValue(obj, newPropValue);
            }
        }    

    }
}
